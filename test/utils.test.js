/* eslint-env mocha */
import "babel-polyfill";
import { getJsonObject } from "../src/parsers/utils";
import { assert } from "chai";
import fs from "fs";

const fileReader = (fileName) =>
  fs.readFileSync(fileName, { encoding: "utf-8" });


describe("#getJsonObject", function () {
  it("extracts simple object json", function () {
    const json = getJsonObject(`{"foo": "bar"};sadas`)
    assert.deepEqual(json, {foo: "bar"});
  });

  it("throws if non json characters at the start of text", function () {
    assert.throws(() => getJsonObject(`test{"foo": "bar"};sadas`));
    assert.throws(() => getJsonObject(`test[{"foo": "bar"}];sadas`));
  });

  it("extract simple array json", function () {
    const json = getJsonObject(`[{"foo": "bar"}];asdas`)
    assert.deepEqual(json, [{foo: "bar"}]);
  });

  it("extracts simple json object with closing bracket in value", function () {
    const json = getJsonObject(`{"foo": "ba}r"};asdsa`)
    assert.deepEqual(json, {foo: "ba}r"});
  });

  it("extracts simple json object with opening bracket in value", function () {
    const json = getJsonObject(`{"foo": "ba{r"};asdsa`)
    assert.deepEqual(json, {foo: "ba{r"});
  });

  it("extracts simple json array with closing bracket in value", function () {
    const json = getJsonObject(`[{"foo": "ba]r"}];asdsa`)
    assert.deepEqual(json, [{foo: "ba]r"}]);
  });

  it("extracts simple json array with opening bracket in value", function () {
    const json = getJsonObject(`[{"foo": "ba[r"}];asdsa`)
    assert.deepEqual(json, [{foo: "ba[r"}]);
  });

  it("extracts simple object json with bracket at the end", function () {
    const json = getJsonObject(`{"foo": "bar"};sadas{}`)
    assert.deepEqual(json, {foo: "bar"});
  });

  it("extracts simple object json with closing brackets at the end", function () {
    const json = getJsonObject(`{"foo": "bar"};sadas}`)
    assert.deepEqual(json, {foo: "bar"});
  });

  it("extracts simple object json with multiple closing brackets at the end", function () {
    const json = getJsonObject(`{"foo": "bar"}}}}}}}`)
    assert.deepEqual(json, {foo: "bar"});
  });

  it("extracts simple array json with opening brackets at the end", function () {
    const json = getJsonObject(`{"foo": "bar"};sadas{`)
    assert.deepEqual(json, {foo: "bar"});
  });

  it("extracts simple array json with bracket at the end", function () {
    const json = getJsonObject(`[{"foo": "bar"}];sadas[]`)
    assert.deepEqual(json, [{foo: "bar"}]);
  });
  
  it("extracts simple array json with closing brackets at the end", function () {
    const json = getJsonObject(`[{"foo": "bar"}];sadas]`)
    assert.deepEqual(json, [{foo: "bar"}]);
  });

  it("extracts simple array json with opening brackets at the end", function () {
    const json = getJsonObject(`[{"foo": "bar"}];sadas[`)
    assert.deepEqual(json, [{foo: "bar"}]);
  });

  it("extracts simple array json with multiple closing brackets at the end", function () {
    const json = getJsonObject(`[{"foo": "bar"}]]]]]]]`)
    assert.deepEqual(json, [{foo: "bar"}]);
  });

  it("extracts advanced json object", function () {
    const jsonText = 
      fileReader("test/resources/advancedJson.txt");

    const expected = 
      fileReader("test/resources/advancedJsonExtracted.txt");

    const json = getJsonObject(jsonText)
    assert.deepEqual(json, JSON.parse(expected));
  });

  it("throws when trying to extract advanced json broken object (missing one closing curly bracket)", function () {
    const jsonText = 
      fileReader("test/resources/advancedJsonBroken.txt");

    assert.throws(() => getJsonObject(jsonText));
  });
});
