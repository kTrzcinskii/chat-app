import Image from "next/image";

interface AvatarProps {
  img_src: any;
}

const Avatar: React.FC<AvatarProps> = ({ img_src }) => {
  return (
    <div className='relative w-[50px] h-[50px] rounded-full border-2 border-zinc-800 bg-gray-200'>
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
