# useSelect

```ts
import { ref } from 'vue'
interface SelectOptions {
  options: Ref<any>;
  autofocus: boolean;
  disabled: boolean;
  multiple: boolean;
  multipleSize: number;
  required: boolean;
}
const useSelect: (options: SelectOptions) => {}
const select = useSelect({});
```

1. (autofocus](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select#autocomplete)
2. (disabled](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select#disable)
3. (multiple](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select#multiple)
4. (required](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select#required)

```html
<select disabled name="pets" id="pet-select">
  <option value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
  <option value="parrot">Parrot</option>
  <option value="spider">Spider</option>
  <option value="goldfish">Goldfish</option>
</select>
```
