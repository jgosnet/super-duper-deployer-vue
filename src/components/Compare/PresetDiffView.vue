<template lang="pug">

v-textarea(v-model="prev" )
v-textarea(v-model="current" )
//input(type="checkbox" v-model="isSplit")

Diff(
    :mode="split"
    theme="dark"
    :language="language"
    :prev="prev"
    :current="current"
    :virtual-scroll="{ height: 500, lineMinHeight: 24, delay: 100 }")
</template>

<script>
export default {
  name: "PresetDiffView",
  data(){
    return {
      mode: "split",
      language: "python",
      // prev: "this is the text\nsecond line\nTEST",
      // current: "this is the text\nno line\nTEST",
      prev: "from rally import asset, supplyChain, files\n" +
          "import logging\n" +
          "import __pl_logging\n" +
          "from timecode import Timecode\n" +
          "\n" +
          "logger = logging.getLogger(\"test_SDK\")\n" +
          "\n" +
          "def eval_main(context):\n" +
          "    data = context.get(\"dynamicPresetData\", {})\n" +
          "    logger.info(f\"dpd: {data}\")\n" +
          "\n" +
          "    # user_md = asset.get_user_metadata() or {}\n" +
          "    # logger.info(f\"user_metadata: {user_md}\")\n" +
          "    #\n" +
          "    # asset_id = asset.get_asset()['id']\n" +
          "    # logger.info(asset_id)\n" +
          "    tc = Timecode(23.974, start_seconds=0.1)\n" +
          "\n" +
          "    return\n",
      current: "from rally import asset, supplyChain, files\n" +
          "import logging\n" +
          "\n" +
          "logger = logging.getLogger(\"test_SDK1\")\n" +
          "\n" +
          "def eval_main(context):\n" +
          "    data = context.get(\"dynamicPresetData\", {})\n" +
          "    logger.info(f\"dpd: {data}\")\n" +
          "\n" +
          "    # user_md = asset.get_user_metadata() or {}\n" +
          "    # logger.info(f\"user_metadata: {user_md}\")\n" +
          "    #    tc = Timecode(23.974, start_seconds=0.1)\n" +
          "    # asset_id = asset.get_asset()['id']\n" +
          "    # logger.info(asset_id)\n" +
          "\n" +
          "\n" +
          "    return\n"
    }
  }
}
</script>

<style scoped>

</style>