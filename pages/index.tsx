import { Htag, Button, P, Tag } from '../components';

export default function Home(): JSX.Element {
	return (
		<>
			<Htag tag='h1'>Text</Htag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button</Button>
			<P size='l'>new text</P>
			<P>new text</P>
			<P size='s'>new text</P>
			<Tag size='s' color='red'>new link</Tag>
		</>
	);
}
