import translateMixin from '~/mixins/translate'
import head from '~/mixins/head'
import Content from '~/components/content'
import AText from '~/components/ui/atoms/text'
import AButton from '~/components/ui/atoms/buttons'
import AImg from '~/components/ui/atoms/img'
import Cookies from '~/components/cookies'

export default {
	mixins: [translateMixin, head],
	components: {
		Content,
		AText,
		AButton,
		AImg,
		Cookies
	}
}
