import postcss from 'postcss'
import postCssTinywind from '../postcss-tinywind'

describe('Default options', () => {
  const FIXTURES = {
    input1: {
      before: `\
.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
`,
      after: `\
@layer utilities {.flex {
	display: flex;
}
.flex-1 {
	flex: 1;
}
}

.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
`,
    },
  }

  for (const [name, data] of Object.entries(FIXTURES)) {
    it(`Fixture: ${name}`, async () => {
      const res = await postcss([postCssTinywind()]).process(data.before, { from: 'test-file.js' })
      expect(res.css).toBe(data.after)
    })
  }
})
