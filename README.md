# rollup-plugin-mcss

rollup-plugin for mcss

## usage

```javascript
import mcss from 'rollup-plugin-mcss';

mcss({
  include: ['**/*.mcss'],       // default include

  output: true,                 // default, bundle.css will be ouput to the same path as bundle.js

  output: './dist/bundle.css',    // output to the path relative to current working directory

  output: false,                // transpiled css code will be exported as `export default ${cssCode}`

  transpileOnly: false,         // default, transpile mcss and export it as string, `export default ${cssCode}`

  transpileOnly: true,         // transpile mcss, and replace the original .mcss code
});
```
