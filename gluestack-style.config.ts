import { createConfig } from "@gluestack-style/react"
export const config = createConfig({
  aliases: {},
  tokens: {
     colors: {
       pri: "#06060a",
       sec: "#e4e2f2",
       accent: "#585862",
       back: "#BBBBC4",
       text: "#3A3A45",
       light: "#f43f5e",
     }
  },
   components: {
    Button: {  // write same component name which is passed in styled
      theme: {
        'bg': '$primary500',
        variants:{
          variant:{
            secondary:{
              bg:'$secondary500',
            }
          }
        }
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
  },
} as const);
