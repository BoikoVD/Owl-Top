import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { api } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>Main page</Htag>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(api.topPage.find, {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}