import { ListPosition } from './types';

interface ListConnectionProps {
  listPosition: ListPosition[];
  children: React.ReactNode;
}

const ListConnection = ({ listPosition, children }: ListConnectionProps) => {
  return (
    <div className='flex min-h-[30px] pr-[30px]'>
      {listPosition.map((position, index) => (
        <div key={`${position}-${index}`} className='relative h-full w-[30px]'>
          {position === ListPosition.BOUND && <CenterVerticalLine />}

          {position === ListPosition.START && (
            <>
              <CenterVerticalLine />
              <CenterHorizontalHalfLine />
            </>
          )}

          {position === ListPosition.CENTER && (
            <>
              <CenterVerticalLine />
              <CenterHorizontalHalfLine />
            </>
          )}

          {position === ListPosition.END && (
            <>
              <CenterHorizontalHalfLine />
              <CenterVerticalHalfLine />
            </>
          )}
        </div>
      ))}

      <div
        className='relative z-10 flex h-full w-[30px] items-center justify-center pl-[30px]'
        onDoubleClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

function CenterVerticalLine() {
  return <div className='absolute left-1/2 -top-1/2 h-[200%] w-[2px] bg-[#666]' />;
}

function CenterVerticalHalfLine() {
  return <div className='absolute left-1/2 -top-1/2 h-full w-[2px] bg-[#666]' />;
}

function CenterHorizontalHalfLine() {
  return <div className='absolute left-1/2 top-1/2 h-[2px] w-full bg-[#666]' />;
}

export default ListConnection;
