import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolvePersonFolder, selectRandomImages, FOUNDER_NAME } from "./base-images.js";

describe("FOUNDER_NAME", () => {
  it("is bill", () => {
    assert.equal(FOUNDER_NAME, "bill");
  });
});

describe("resolvePersonFolder", () => {
  it("returns person name when person is provided", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.equal(resolvePersonFolder({ person: "jim" }, available), "jim");
  });

  it("returns bill for founder role", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.equal(resolvePersonFolder({ role: "founder" }, available), "bill");
  });

  it("returns a non-bill person for team_member role", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    const result = resolvePersonFolder({ role: "team_member" }, available);
    assert.ok(result !== "bill");
    assert.ok(available.includes(result));
  });

  it("person overrides role", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.equal(
      resolvePersonFolder({ person: "sean", role: "founder" }, available),
      "sean"
    );
  });

  it("throws for unknown person", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.throws(
      () => resolvePersonFolder({ person: "unknown" }, available),
      /not found/
    );
  });

  it("throws when neither role nor person provided", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.throws(
      () => resolvePersonFolder({}, available),
      /Either.*role.*person/
    );
  });
});

describe("selectRandomImages", () => {
  it("returns 2 images from a list of 4", () => {
    const files = ["a.jpg", "b.jpg", "c.jpg", "d.jpg"];
    const result = selectRandomImages(files, 2);
    assert.equal(result.length, 2);
    for (const r of result) {
      assert.ok(files.includes(r));
    }
  });

  it("returns all images when fewer than requested", () => {
    const files = ["a.jpg"];
    const result = selectRandomImages(files, 2);
    assert.equal(result.length, 1);
    assert.equal(result[0], "a.jpg");
  });

  it("returns no duplicates", () => {
    const files = ["a.jpg", "b.jpg", "c.jpg"];
    const result = selectRandomImages(files, 2);
    assert.equal(new Set(result).size, result.length);
  });
});
