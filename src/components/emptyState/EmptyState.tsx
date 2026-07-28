import emptyStateLightMode from "../emptyState/emptyStateLightMode.svg";
import emptyStateDarkMode from "../emptyState/emptyStateDarkMode.svg";
import "./emptyState.css";

type EmptyStateProps = {
  currentTheme: string;
};

function EmptyState({ currentTheme }: EmptyStateProps) {
  return (
    <img
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      src={currentTheme === "dark" ? emptyStateDarkMode : emptyStateLightMode}
      alt="No transactions"
      className="emptyState"
    />
  );
}

export default EmptyState;
