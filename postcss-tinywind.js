import postcss from 'postcss'
import { cosmiconfig } from 'cosmiconfig'
import path from "path"

export const CONFIG_ID = 'tinywind'
export const CONFIG_FILE_NAME = 'tinywind.config.js'

const plugin = () => {
	return {
		postcssPlugin: "postcss-tinywind",
    async Once(root) {
			const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

			const explorer = cosmiconfig(CONFIG_ID)
			const result = await explorer.load(
				configPath
			)

			if (!result) {
				console.log(`Tinywind config not found in ${configPath}`)
				return
			}

			const content = result.config.classes.map(cls => cls.css).join('\n')
      const globalRoot = postcss.parse(content);
			root.prepend(globalRoot);
    }
	}
}

plugin.postcss = true

export default plugin
