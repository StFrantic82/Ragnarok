const vm=require('vm');const {ctx}=require('./bench.js');
vm.runInContext(process.argv[4],ctx);process.argv.splice(4,1);
require('./sim2.js');
