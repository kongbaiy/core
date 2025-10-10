#
# SSH 方式克隆代码速度贼慢，改成 HTTPS 方式克隆
# 建议全局设置 git 储存密码，只需要输入一次，避免每次输入密码
# git config --global credential.helper store
#

git clone -b feature-mode https://lightsoft.life:8001/web/sso.git apps/sso
git clone -b feature-mode https://lightsoft.life:8001/web/remote-assistance.git apps/remote-assistance
git clone -b feature-mode https://lightsoft.life:8001/web/operations-manage.git apps/operations-manage
git clone -b feature-mode https://lightsoft.life:8001/web/organization-manage.git apps/organization-manage
git clone -b feature-mode https://lightsoft.life:8001/web/regulatory-platform-wj.git apps/regulatory-platform-wj
