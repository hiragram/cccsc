# Changelog

## [0.4.0](https://github.com/hiragram/cccsc/compare/v0.3.2...v0.4.0) (2025-08-04)


### Features

* exclude documentation files from command installation ([2d5ea42](https://github.com/hiragram/cccsc/commit/2d5ea420835c84eb6f59029ad481516952bc6b63))
* exclude documentation files from command installation ([454508c](https://github.com/hiragram/cccsc/commit/454508cbe236e0f359a72ba48033cd8083e239a1))
* implement comprehensive code quality improvements ([d570cbc](https://github.com/hiragram/cccsc/commit/d570cbc9242f8b010cdf831f23a388f3ea56790e))


### Bug Fixes

* address additional code review feedback ([2aff75b](https://github.com/hiragram/cccsc/commit/2aff75b1a8034fb83e6b1234dd7131196a64a6ec))
* address code review feedback ([86d754e](https://github.com/hiragram/cccsc/commit/86d754e21c08b6c2c0d446a5e08e3c251e317cdf))
* change lockfile only field from string array to object array ([a3be095](https://github.com/hiragram/cccsc/commit/a3be0955c8359eac1dbdf946d6bec1f223d515db))
* CI failures for lint and tests ([b4b97a3](https://github.com/hiragram/cccsc/commit/b4b97a36246f0fa5846970fc6031ba90d59ff09e))
* comprehensive fixes for final code review ([dbcadd6](https://github.com/hiragram/cccsc/commit/dbcadd63938731190980e634788b20307cd52808))
* ensure name field is always original command name ([6660a91](https://github.com/hiragram/cccsc/commit/6660a91eb34c3794d5fd291c2222cf165d2ee676))
* ensure name field is always original command name ([5c218f7](https://github.com/hiragram/cccsc/commit/5c218f70200c3456ac3508ac99cce6d1b8e670ab))
* restore console.log statements for CLI feedback and fix tests ([1007d0d](https://github.com/hiragram/cccsc/commit/1007d0dbc43ecc9bd43505cae31af15e948bde0e))
* update lockfile version to 3 for npm compatibility ([c0be9e3](https://github.com/hiragram/cccsc/commit/c0be9e3066b987faeb1bf1cc37f7430959277ebb))
* update lockfile version to 3 for npm compatibility ([df18f78](https://github.com/hiragram/cccsc/commit/df18f785f37d60ad5f485f8b46bd9835980e8cf0))
* update test to expect lockfileVersion 3 ([37c34d0](https://github.com/hiragram/cccsc/commit/37c34d0f0d7d1b3250cacda35d25fd501f3fc474))

## [0.3.2](https://github.com/hiragram/cccsc/compare/v0.3.1...v0.3.2) (2025-07-03)


### Bug Fixes

* update README.md samples to match actual implementation ([c8eec6e](https://github.com/hiragram/cccsc/commit/c8eec6ee11f8eff74a4b156f64c8b5e1321877aa))
* update README.md samples to match actual implementation ([7103ce7](https://github.com/hiragram/cccsc/commit/7103ce77d8fe3f96590338d7e5180d3f4dd1a20a))

## [0.3.1](https://github.com/hiragram/cccsc/compare/v0.3.0...v0.3.1) (2025-07-03)


### Bug Fixes

* update CI workflow and tests for cccsc command name ([2db2916](https://github.com/hiragram/cccsc/commit/2db29164e6fda9c41bad431829f92fa44677db5f))

## 0.3.0 (2025-07-03)


### ⚠ BREAKING CHANGES

* cccsc.json format changed to repository-based structure
* Lock file format changed from commands to repositories structure

### Features

* add 'only' property to lock file for selective command installation ([b9a0953](https://github.com/hiragram/jumon/commit/b9a0953bcbd58a1e361594f4045eeec3576f53f0))
* add comprehensive unit tests and GitHub Actions CI ([52348dc](https://github.com/hiragram/jumon/commit/52348dc2db142380163ad8f34be8ec2c05e52d16))
* add diff preview and confirmation to update command ([b4f96fe](https://github.com/hiragram/jumon/commit/b4f96fe0f40459de98b0899e1399149b76c1124e))
* add interactive confirmation for repository configuration conflicts ([29de2bd](https://github.com/hiragram/jumon/commit/29de2bdff56bf9c421a57bdb4b3ebcc6e3b5ece9))
* add update command for refreshing commands based on version constraints ([7f97925](https://github.com/hiragram/jumon/commit/7f979252bd4bb648590b987c2900a6f61ef875c0))
* change default installation to local and add .claude directory validation ([6255007](https://github.com/hiragram/jumon/commit/6255007ea7a4d00ebf4e67fa183f9070b411814e))
* implement MVP of Claude Code command package manager ([ddee4d3](https://github.com/hiragram/jumon/commit/ddee4d3a7fbf09daa635b4721a929465262edb81))
* move global configuration files to ~/.cccsc/ directory ([05a7e38](https://github.com/hiragram/jumon/commit/05a7e38d519fdf9840b7dcd125900b19c3d9c4e5))
* rename 'commands' to 'only' and add version/branch/tag support ([a80d077](https://github.com/hiragram/jumon/commit/a80d077c0eeaaf64843b4edc46280069f53afb48))
* restructure cccsc.json to repository-based format ([6874e8f](https://github.com/hiragram/jumon/commit/6874e8fd05eec9713f837d4e3a9df137c49275f3))
* restructure lock file to use repository-based tracking ([66839dc](https://github.com/hiragram/jumon/commit/66839dc7e76dc97bfda7f7073c242d64f857c93f))
* set default branch to 'main' when no version constraints specified ([5db4931](https://github.com/hiragram/jumon/commit/5db4931aaf16f04342eed35e24a512ef7cc62f0e))


### Bug Fixes

* add branch parameter support to GitHub API functions ([7413a9e](https://github.com/hiragram/jumon/commit/7413a9efec8e3c6f4312183543757856f85d82e5))
* add branch parameter support to GitHub API functions ([873b927](https://github.com/hiragram/jumon/commit/873b9277c23e7d127ca11ee0f61c7b1266a83cd1))
* add missing @vitest/coverage-v8 dependency ([fbe3373](https://github.com/hiragram/jumon/commit/fbe3373d0439be6ba86843733fdf4cccccaa0273))
* correct command name handling and test expectations ([8b94a44](https://github.com/hiragram/jumon/commit/8b94a44b3b793cef05bf658926aba9bffae15102))
* correct Jest mocking and test expectations ([18e7ab0](https://github.com/hiragram/jumon/commit/18e7ab0436e3dcd53b34b90fd51aed2fd8b87e37))
* remove problematic github.test.js to resolve memory issues ([0bb01f2](https://github.com/hiragram/jumon/commit/0bb01f201fdff616b4cb94d7d6422c8236352696))
* update GitHub Actions permissions and use googleapis/release-please-action ([0ff0894](https://github.com/hiragram/jumon/commit/0ff0894f3e56b48ba11dfc956b69eee6d48b4900))
