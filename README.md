# rollup-plugin-mcss

rollup-plugin for mcss

## usage

```javascript
import mcss from 'rollup-plugin-mcss';

mcss({
  include: ['**/*.mcss'],       // default include

  output: true,                 // default, css bundle will be ouput as where .js is

  output: 'dist/bundle.css',    // output path relative to current working directory

  output: false,                // .css transpiled code be will export, 'export default ${cssCode}'
});
```
