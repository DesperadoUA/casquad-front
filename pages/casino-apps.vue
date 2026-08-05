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
		:pros="pros"
		:cons="cons"
		:pros_cons_title="pros_cons_title"
		:pros_title="pros_title"
		:cons_title="cons_title"
		:author_summary="author_summary"
		:author="author"
		:faq_title="faq_title"
		:faq="faq"
		:casino="casino"
	/>
</template>

<script>
import defaultStaticPage from '~/mixins/defaultStaticPage'

export default {
	name: 'casino-apps',
	mixins: [defaultStaticPage]
}
</script>
