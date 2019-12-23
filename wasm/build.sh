#!/bin/bash

cd ./wasm

GOOS=js GOARCH=wasm go build -o main.wasm

cp -pr main.wasm ../public
