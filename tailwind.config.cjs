module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#1A1A1A",
        gray: {
          100: "#F9F9F9",
          150: "#F4F4F4",
          200: "#EBEBEB",
          300: "#D7D7D7",
          400: "#BEBEBE",
          500: "#888888",
          600: "#5B5B5B",
          700: "#2F2F2F",
          750: "#2F2F2F",
          800: "#252525"
        },
        main: "#9CED1A",
        sub1: "#BEF861",
        sub2: "#E1FBB8",
        point: "#F74E4E",
        etc: {
          brown: "#AB5820",
          navy: "#20548E",
          green: "#5E7826",
          purple: "#773975"
        }
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"]
      },
      fontSize: {
        hero: [
          "50px",
          { lineHeight: "150%", letterSpacing: "-0.04em", fontWeight: "600" }
        ],
        heading1: [
          "38px",
          { lineHeight: "150%", letterSpacing: "-0.04em", fontWeight: "600" }
        ],
        heading2: [
          "28px",
          { lineHeight: "150%", letterSpacing: "-0.04em", fontWeight: "600" }
        ],
        heading3: [
          "22px",
          { lineHeight: "150%", letterSpacing: "-0.04em", fontWeight: "600" }
        ],
        heading4: [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "600" }
        ],
        body1: [
          "20px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" }
        ],
        body2: [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" }
        ],
        body3: [
          "16px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" }
        ],
        caption: [
          "14px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" }
        ],
        button1: [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "600" }
        ],
        button2: [
          "16px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "600" }
        ],
        tag: [
          "14px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "600" }
        ]
      }
    }
  },
  plugins: []
};
