# Verify configuration after installing package:
git config --get core.hooksPath

# Reverting Changes, switch back to default hooks:
git config --unset core.hooksPath
