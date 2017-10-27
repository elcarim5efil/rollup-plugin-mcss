const fs = require('fs-extra');
const _ = require('rollup-pluginutils');
const Path = require('path');
const mcss = require('mcss');
const createFilter = _.createFilter;

module.exports = function plugin(options = {}) {
  const filter = createFilter(options.include || ['**/*.mcss'], options.exclude || 'node_modules/**');
  const codes = {};
  const paths = [];
  const cwd = process.cwd();
  const styles = [];

  const output = options.output === undefined ? true : options.output;
  return {
    name: 'mcss',
    transform(code, id) {
      if (!filter(id)) {
        return;
      }
      const mcssFile = Path.resolve(cwd, id);

      return new Promise((resolve) => {
        const mcssInstance = mcss({
          filename: mcssFile,
          importCSS: true
        });
        mcssInstance.translate(code).done((css) => {
          styles.push({
            id,
            css
          });

          if (output) {
            code = '""';
          } else {
            code = css;
          }
          resolve({
            code: `export default ${code};`,
            mappings: ''
          });
        }).fail((err) => {
          console.error('mcss parsing err', err);
        });
      });
    },
    ongenerate(opts) {
      if (!output) {
        return;
      }
      let file = typeof output === 'string' ? output : opts.file.replace(/.js$/, '.css');
      const destCss = styles.reduce((s, style) => (s += style.css), '');
      return new Promise((resolve, reject) => {
        fs.outputFile(Path.resolve(cwd, file), destCss, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };
};
