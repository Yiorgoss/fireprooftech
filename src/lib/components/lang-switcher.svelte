<script lang="ts">
	import { availableLanguageTags, languageTag } from '$pg/runtime';
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';

  import {ChevronDown} from "lucide-svelte"
  import {flags} from "$lib/assets/flags"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";


  // let currentLang = $page.params.lang as AvailableLanguageTag ?? sourceLanguageTag;
  let currentLang = languageTag();
</script>

<div class="">
	<DropdownMenu.Root >
		<DropdownMenu.Trigger class='px-5 py-3 flex flex-row-reverse md:flex-row justify-center items-center gap-2 h-full border-none'>
      <div>
      <ChevronDown class="h-4 w-4"/>

				<span class="sr-only">Open Menu</span>
        </div>
      <img class="h-6 w-6" src={flags[currentLang]} alt={currentLang}/>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-fit min-w-0">
			{#each availableLanguageTags as lang}
				<DropdownMenu.Item class="m-2 w-fit px-2 py-1">
					<a href={i18n.route($page.url.pathname)} hreflang={lang == "il" ? "il" : lang}>
            <img class="h-6 w-6 " src={flags[lang]} alt={lang} />
					</a>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
