interface ImageModalProps {
  imageSrc: string;
  title?: string; // e.g., student's name
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, title }) => {
  return (
    <div className="relative w-full">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-100 object-cover rounded-lg shadow-lg"
      />
      <div className="absolute bottom-0 left-0 w-full bg-transparent  text-white text-center py-2 rounded-b-lg">
        {title}
      </div>
    </div>
  );
};
