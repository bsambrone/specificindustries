import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateDimensions, validateFilename } from "./validation.js";

describe("validateDimensions", () => {
  it("accepts 1024x1024", () => {
    assert.equal(validateDimensions(1024, 1024), null);
  });

  it("accepts 1536x1024", () => {
    assert.equal(validateDimensions(1536, 1024), null);
  });

  it("accepts 1024x1536", () => {
    assert.equal(validateDimensions(1024, 1536), null);
  });

  it("rejects invalid dimensions", () => {
    const err = validateDimensions(512, 512);
    assert.ok(err);
    assert.ok(err.includes("512x512"));
    assert.ok(err.includes("1024x1024"));
  });
});

describe("validateFilename", () => {
  it("accepts valid png filename", () => {
    assert.equal(validateFilename("hero.png"), null);
  });

  it("accepts valid jpg filename", () => {
    assert.equal(validateFilename("team-photo.jpg"), null);
  });

  it("accepts valid webp filename", () => {
    assert.equal(validateFilename("product.webp"), null);
  });

  it("rejects path traversal", () => {
    const err = validateFilename("../../etc/passwd");
    assert.ok(err);
  });

  it("rejects forward slash paths", () => {
    const err = validateFilename("subdir/file.png");
    assert.ok(err);
  });

  it("rejects backslash paths", () => {
    const err = validateFilename("subdir\\file.png");
    assert.ok(err);
  });

  it("rejects invalid extension", () => {
    const err = validateFilename("file.bmp");
    assert.ok(err);
  });

  it("rejects no extension", () => {
    const err = validateFilename("file");
    assert.ok(err);
  });
});
