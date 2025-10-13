import postcss from 'postcss'
import { cosmiconfig } from 'cosmiconfig'
import path from "path"

export const CONFIG_ID = 'tinywind'
export const CONFIG_FILE_NAME = 'tinywind.config.js'

let injectedOnce = false;

const plugin = ({ layerName = 'utilities' } = {}) => {
	return {
		postcssPlugin: "postcss-tinywind",
    async Once(root, { result }) {
			 if (injectedOnce) return;

			const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

			const explorer = cosmiconfig(CONFIG_ID)
			const configResult = await explorer.load(
				configPath
			)

			if (!configResult) {
				result.warn(
          `[postcss-tinywind] Could not load config file: ${configPath}`
        )
				return
			}

			result.messages.push({
				type: "dependency",
				plugin: "postcss-tinywind",
				file: configPath,
			});

			const content = configResult.config.classes.map(cls => cls.css).join('\n')

			const layer = postcss.atRule({ name: 'layer', params: layerName })

      const tinywindClasses = postcss.parse(content);
			layer.append(tinywindClasses)
			root.prepend(layer);
    }
	}
}

plugin.postcss = true

export default plugin
