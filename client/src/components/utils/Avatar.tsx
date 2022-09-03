import Image from "next/image";

interface AvatarProps {
  img_src: any;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ img_src, size = 50 }) => {
  return (
    <div
      className='relative rounded-full border-2 border-zinc-800 bg-gray-200'
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        src={img_src}
        alt='avatar'
        layout='fill'
        className='rounded-full'
      />
    </div>
  );
};

export default Avatar;
