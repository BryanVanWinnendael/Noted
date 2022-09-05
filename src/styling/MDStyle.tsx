import { Map } from "immutable"

type Props = {
  children: any
}

// #CCCCFF
const Code = ({children, ...props}: Props) => {
    return (
        <div className="bg-gray-200 rounded-md p-2">
           {children}
        </div>
    );
}

const HeadingOne = ({children, ...props}: Props) => {
    return (
      <h1 className="text-5xl text-h_white font-semibold">
        {children}
      </h1>
    )
}

const HeadingTwo = ({children, ...props}: Props) => {
    return (
        <h2 className="text-4xl text-h_white font-semibold">
            {children}
        </h2>
    )
}

const HeadingThree = ({children, ...props}: Props) => {
    return (
        <h3 className="text-3xl text-h_white font-semibold">
            {children}
        </h3>
    )
}

const HeadingFour = ({children, ...props}: Props) => {
    return (
        <h4 className="text-2xl text-h_white font-semibold">
            {children}
        </h4>
    )
}

const HeadingFive = ({children, ...props}: Props) => {
    return (
        <h5 className="text-xl text-h_white font-semibold">
            {children}
        </h5>
    )
}

const HeadingSix = ({children, ...props}: Props) => {
    return (
        <h6 className="text-lg text-h_white font-semibold">
            {children}
        </h6>
    )
}

const Blockquote = ({children, ...props}: Props) => {
    return (
        <blockquote className="border-solid border-l-2 border-perwinkle pl-2 text-gray-600 ml-5">
            {children}
        </blockquote>
    )
}

const UnorderedList = ({children, ...props}: Props) => {
    return (
        <li>
            {children}
        </li>
    )
}

export const blockRenderMap = Map({
    'header-one': {
        element: 'h1',
        wrapper: <HeadingOne children={undefined}/>
    },
    'header-two': {
        element: 'h2',
        wrapper: <HeadingTwo children={undefined}/>
    },
    'header-three': {
        element: 'h3',
        wrapper: <HeadingThree children={undefined}/>
    },
    'header-four': {
        element: 'h4',
        wrapper: <HeadingFour children={undefined}/>
    },
    'header-five': {
        element: 'h5',
        wrapper: <HeadingFive children={undefined}/>
    },
    'header-six': {
        element: 'h6',
        wrapper: <HeadingSix children={undefined}/>
    }
    ,
    'code-block': {
        element: 'code-block',
        wrapper: <Code children={undefined} />,
    }
    ,
    'blockquote': {
        element: 'blockquote',
        wrapper: <Blockquote children={undefined} />,
    }
    
})
