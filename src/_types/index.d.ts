type LinkButtonComponent = {
    children: React.ReactNode;
    href: string;
}

type PrimaryButtonComponent = {
    classes?: string;
    children: React.ReactNode;
    onClick: () => void;
}

type SecondaryButtonComponent = {
    children: React.ReactNode;
    onClick: () => void;
}

type ImageType = {
    id: string;
    full: string;
    alt_description: string;
    urls: {
        regular: string;
    }
}

type ImageCanvasProps = {
    image: Partial<ImageType>;
    save: (info: saveImageParams) => void;
    close: () => void;
};

type RequestEditProps = {
    image: Partial<ImageType>;
    close: () => void;
}

type EditRequestHandlerArg = {
    input: { 
        image: string;
        editDescription: string;
    }
}
