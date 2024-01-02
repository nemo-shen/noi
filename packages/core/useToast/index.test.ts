import { expect, test } from "vitest";
import { useToast } from "@noi/core";
import { ref } from 'vue'

test("should be call", () => {
  const source = ref([])
  const { open } = useToast(source)
  expect(open).toBeTypeOf('function')
});