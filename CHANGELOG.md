## [1.3.0] - 2026-07-26
### Added
- Auto-set hook file permissions (chmod +x) during postinstall
- Auto-create .gitignore in build/ if missing
- Auto-create .env in build/ if missing
- Post-install verification step with console status output
- Verify web/ and back/ folders exist — error if both missing, warn if one missing

## [1.2.7] - 2025-04-01
### Changed
- Changed envFile to buildEnvFile
- Added webEnvFile & backEnvFile

## [1.2.6] - 2025-03-25
### Fixed
- Fixed push staged commits after tag push: Added missed execSync import

## [1.2.5] - 2025-03-25
### Added
- Added logging of pushed commits & branch

## [1.2.4] - 2025-03-25
### Fixed
- Fixed post-commit
### Added
- Added clear debug log file only on pre-commit

## [1.0.1] - 2025-03-25
### Fixed
- Fixed Git hooks installation from `/build` folder
- Improved error handling