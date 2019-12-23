package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"

	"go/ast"
	"go/format"
	"go/parser"
	"go/token"
	"syscall/js"
)

// TypeField is struct
type TypeField struct {
	FieldName string `json:"name"`
	FieldType string `json:"type"`
	FieldTag  string `json:"tag"`
}

// StructVisitor is struct
type StructVisitor struct {
	Name   string      `json:"name"`
	Fields []TypeField `json:"fields"`
}

// Visit is func
func (v *StructVisitor) Visit(node ast.Node) ast.Visitor {
	if node == nil {
		return v
	}

	switch t := node.(type) {
	case *ast.TypeSpec:
		v.Name = fmt.Sprintf("%s", t.Name)
	case *ast.StructType:
		fields := t.Fields.List
		v.Fields = extractFields(fields)
	default:
	}

	return v
}

func extractFields(fields []*ast.Field) []TypeField {
	extractFields := []TypeField{}
	for _, f := range fields {
		typeField, ok := extractField(f)

		if ok {
			extractFields = append(extractFields, typeField)
		}
	}

	return extractFields
}

func extractField(field *ast.Field) (TypeField, bool) {
	if field.Tag == nil {
		return TypeField{}, false
	}

	// fieldName
	if len(field.Names) == 0 || field.Names[0].Name == "" {
		return TypeField{}, false
	}
	fieldName := field.Names[0].Name

	// fieldType
	if field.Type == nil {
		return TypeField{}, false
	}
	var b bytes.Buffer
	format.Node(&b, token.NewFileSet(), field.Type)
	fieldType := b.String()

	// fieldTag
	if field.Tag == nil {
		return TypeField{}, false
	}
	var bb bytes.Buffer
	format.Node(&bb, token.NewFileSet(), field.Tag)
	fieldTag := bb.String()

	return TypeField{
		FieldName: fieldName,
		FieldType: fieldType,
		FieldTag:  fieldTag,
	}, true
}

func parseStruct(this js.Value, args []js.Value) interface{} {
	source := fmt.Sprintf("package Demo \n%s", args[0])

	source = strings.Replace(source, "'", "`", -1)
	fset := token.NewFileSet()
	f, err := parser.ParseFile(fset, "", source, 0)
	if err != nil {
		fmt.Println(err)
	}

	visitor := &StructVisitor{}
	ast.Walk(visitor, f)

	jsonValue, err := json.Marshal(*visitor)

	return string(jsonValue)
}

func print(this js.Value, args []js.Value) interface{} {
	fmt.Println(args[0])

	return "aaa"
}

func setFuncs() {
	js.Global().Set("parseStruct", js.FuncOf(parseStruct))
	js.Global().Set("printValue", js.FuncOf(print))
}

func main() {
	done := make(chan struct{}, 0)
	setFuncs()
	<-done
}
