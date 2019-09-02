/** @jsx jsx */
import { jsx } from "theme-ui";

const Circle: React.FC<{ text: string; size: number }> = ({ text, size }) => (
  <div
    sx={{
      border: "5px solid",
      borderColor: "secondary",
      borderRadius: "50%",
      height: size,
      width: size
    }}>
    <div
      sx={{
        color: "primary",
        backgroundColor: "secondary",
        borderBlockColor: "primary",
        border: `${size / 10}px solid`,
        borderRadius: "50%",
        height: `calc(100% - ${size / 5}px)`,
        width: `calc(100% - ${size / 5}px)`,
        lineHeight: `${size / 1.3}px`,
        textAlign: "center",
        fontSize: `${size / 37}em`
      }}>
      {text}
    </div>
  </div>
);

export default Circle;
