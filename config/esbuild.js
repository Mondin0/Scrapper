import 'dotenv/config'
import esbuild from 'esbuild';

const entryPoints =[
    'src/serviceWorker.js', 'src/scripts/scrapper.js',
    'src/scripts/popup.js',
    'src/scripts/scrappeoCandidatos.js',
    'src/scripts/scrapperV2.js'

];

const { DEPLOYMENT } = process.env

esbuild.build({
    entryPoints,
    watch: DEPLOYMENT === 'DEV',
    minify: !(DEPLOYMENT==='DEV'),
    logLevel: DEPLOYMENT === 'DEV'? 'debug' : 'silent',
    outdir: 'dist',
    bundle: true,
    allowOverwrite: true
}).then(response => {console.log(JSON.stringify(response))})
.catch((err) => {console.log(err)});