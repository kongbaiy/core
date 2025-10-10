type TSocketState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'

declare global {
    interface Window {
        ws?: WebSocket
    }
}
interface IWebSocketConfig {
    timeout?: number
    reconnect: boolean
    reconnectTime?: number
    reconnectMaxNumber?: number
}

const defaultWebSocketConfig: IWebSocketConfig = {
    timeout: 6000,
    reconnect: false,
    reconnectTime: 1000,
    reconnectMaxNumber: 3,
}

export function createWebSocket(url: string, config: IWebSocketConfig | null): WebSocket {
    config = { ...defaultWebSocketConfig, ...config }
    let open: (
        (ws: WebSocket, config: IWebSocketConfig, init: () => WebSocket) => void
    ) | null = reconnectWebSocket()

    const init = (): WebSocket => {
        const ws = new WebSocket(url)

        ws.onerror = () => {
            if (config?.reconnect && open) {
                open(ws, config, init)
            }
            else {
                open = null
                config = null
            }
        }

        return ws
    }

    return init()
}

function reconnectWebSocket() {
    let reconnectTimeout: any
    let reconnectNumber: number | null = 0

    const open = (ws: WebSocket, config: IWebSocketConfig, callback: () => void) => {
        const { reconnectTime, reconnectMaxNumber = 1 } = config
        const isOpen = getState(ws, 'OPEN')

        if (isOpen || (reconnectTimeout && reconnectNumber! >= reconnectMaxNumber)) {
            clearTimeout(reconnectTimeout)
            reconnectTimeout = null
            reconnectNumber = null
            config.reconnect = false
            return
        }

        reconnectTimeout = setTimeout(() => {
            reconnectNumber! += 1
            callback()
        }, reconnectTime)
    }

    return open
}

export function getState(ws: WebSocket, type: TSocketState): boolean {
    return ws.readyState === WebSocket[type]
}

export function useWebSocketMessage(ws: WebSocket, callback: (data: any, e: MessageEvent<any>) => void) {
    try {
        ws.onmessage = (e: MessageEvent<any>) => {
            const data = JSON.parse(e.data)

            callback(data, e)
        }
    } catch (error) {
        console.error(error)
    }
}

export function useWebSocketClose(ws: WebSocket, code?: number, message?: string) {
    code = code || 1000
    message = message || 'connection closed by client'
    ws.close(code, message)
}

export function checkWsExist(callback: () => void, maxRetries: number = 0) {
    const interval = setInterval(() => {
      // 判断 window.ws 是否已存在
      if (window.ws && window.ws.readyState === WebSocket.OPEN) {
        // 如果已存在并且状态是OPEN，则执行回调
        callback()

        // 执行回调后清除定时器，停止判断
        clearInterval(interval)
      }
    }, maxRetries) // 如果有延迟会导致页面状态更新不及时，所以不设置延迟
  }
