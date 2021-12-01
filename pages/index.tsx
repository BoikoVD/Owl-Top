import { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>Text</Htag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button</Button>
			<P size='l'>new text</P>
			<P>new text</P>
			<P size='s'>new text</P>
			<Tag size='s' color='red'>new link</Tag>
			<Rating rating={rating} isEditable={true} setRating={setRating} />
		</>
	);
}

export default withLayout(Home);