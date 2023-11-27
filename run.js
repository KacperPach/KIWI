import esbuild from "esbuild"

let ctx = await esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outdir: 'dist',
  })
  
  await ctx.watch()