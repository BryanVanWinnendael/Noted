import { MentionData } from '@draft-js-plugins/mention'

type Props = {
  mention: MentionData
}

export const MentionSuggestionsBlock:React.FC<Props> = ({mention, ...parentProps}:Props) => {
  return (
    <div {...parentProps} className='flex p-2 items-center hover:bg-gray-200'>
      <img
        src={mention.avatar}
        className='h-6 rounded-full mr-2'
      />
      <p>{mention.name}</p>
    </div>
  )
}

export const mentions: MentionData[] = [
  {
    name: 'js',
    avatar: '/images/js.svg',
  },
  {
    name: 'html',
    avatar: '/images/html.svg',
  },
  {
    name: 'css',
    avatar: '/images/css.svg',
  },
  {
    name: 'ts',
    avatar: '/images/ts.svg',
  },
  {
    name: 'react',
    avatar: '/images/react.svg',
  },
  {
    name: 'java',
    avatar: '/images/java.svg',
  },
];