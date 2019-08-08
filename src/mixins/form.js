import store from '@/store'
 const data = {
	methods: {
		form_submit (e) {
			// console.log(store)
			const formId = e.mp.detail.formId
			let formG = store.state.formId.split(',')
			formG = [ ...formG, formId].filter(item => item)
  		store.commit('set_formId', formG.join(','))
  		// console.log(store.state.formId)
  	},
	}
}

export default data
