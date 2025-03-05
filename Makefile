###
# Config
###

JOBS ?= $(shell nproc)
MAKEFLAGS += -j $(JOBS) -r

PATH := $(abspath node_modules)/.bin:$(PATH)

.DELETE_ON_ERROR:
.SECONDARY:
.SUFFIXES:

###
# Clean
###

.PHONY: clean
clean:
	rm -fr node_modules target

###
# Format
###

FORMAT_SRC := $(shell \
	find . \
		-not \( -name node_modules -prune \) \
		-not \( -name target -prune \) \
		-name '*.css' \
		-o -name '*.html' \
		-o -name '*.json' \
		-o -name '*.md' \
		-o -name '*.scss' \
		-o -name '*.ts' \
)

.PHONY: format
format: target/format.log

.PHONY: test-format
test-format: target/format-test.log

target/format.log: target/node_modules.log $(FORMAT_SRC)
	prettier --write $(FORMAT_SRC)
	mkdir -p $(@D)
	touch $@ target/format-test.log

target/format-test.log: target/node_modules.log $(FORMAT_SRC)
	prettier -c $(FORMAT_SRC)
	mkdir -p $(@D)
	touch $@ target/format.log

###
# npm
###

target/node_modules.log: package.json $(wildcard yarn.lock)
	yarn install
	mkdir -p $(@D)
	> $@

###
# Angular
###

NG_SRC := angular.json tsconfig.json $(shell find src -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.scss' -o -name '*.ts')

.PHONY: build
build: target/ng/build.log

.PHONY: watch
watch: target/node_modules.log
	rm -fr target/ng/dev
	ng build --watch

target/ng/build.log: target/node_modules.log $(NG_SRC)
	rm -fr $(@:.log=)
	ng build
	mkdir -p $(@D)
	> $@
	du -hs $(@:.log=)

target/ng/explore.log: target/node_modules.log $(NG_SRC)
	rm -fr $(@:.log=)
	ng build --prod --outputPath $(@:.log=) --sourceMap true
	mkdir -p $(@D)
	> $@
	du -hs $(@:.log=)

###
# Explore
###

.PHONY: explore
explore: target/explore.html

target/explore.html: target/ng/explore.log target/node_modules.log
	mkdir -p $(@D)
	find $(<:.log=) -name '*.css' -or -name '*.js' -print0 | xargs -0 source-map-explorer --html $@
	@echo $@
