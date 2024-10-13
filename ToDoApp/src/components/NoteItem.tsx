import { FC } from "react";
import AppButton from "./AppButton";

interface ItemProps {
  title: string;
  description?: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onViewClick: () => void;
}

const NoteItem: FC<ItemProps> = ({
  title,
  onEditClick,
  onDeleteClick,
  description,
  onViewClick,
}) => {
  return (
    <div className="max-w-3xl shadow-lg mx-auto rounded-2xl">
      <p className="font-semibold text-lg text-gray-700 mb-6 mt-8 font-mono">
        {title}
      </p>
      {description ? (
        <p className="ml-2 font-semibold text-m font-mono text-gray-700 mb-8">
          {description}
        </p>
      ) : null}
      <div className="space-x-32">
        <AppButton type="regular" title={description ? "Hide" : "View"} onClick={onViewClick} />
        <AppButton type="normal" title="Edit" onClick={onEditClick} />
        <AppButton type="danger" title="Delete" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;
