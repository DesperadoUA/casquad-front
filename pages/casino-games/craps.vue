<template>
	<DefaultPage
		:breadcrumbs="[
			{
				title: t('BREADCRUMB_MAIN_PAGE'),
				permalink: '/'
			},
			{
				title,
				permalink: ''
			}
		]"
		:h1="h1"
		:update_at="update_at"
		:content="content"
		:author_summary="author_summary"
		:author="author"
		:faq_title="faq_title"
		:faq="faq"
	/>
</template>

<script>
import defaultStaticPage from '~/mixins/defaultStaticPage'

export default {
	name: 'casino-games-craps',
	mixins: [defaultStaticPage]
}
</script>
