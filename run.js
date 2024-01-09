import esbuild from "esbuild"

let ctx = await esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    target: ['chrome58', 'safari11'],
    outdir: 'dist',
  })
  
  await ctx.watch()
  