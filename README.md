# pre-commit
/**
 * bump version based on back & web package.jsons
 * and save it to TAG_VERSION variable in build/.env file
 */

# post-commit
/**
 * push tag with TAG_VERSION from build/.env file
 * if commit contains "-d"
 */

# Verify configuration after installing package:
git config --get core.hooksPath

# Reverting Changes, switch back to default hooks:
git config --unset core.hooksPath
