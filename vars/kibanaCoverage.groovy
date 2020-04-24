def bootMergeAndIngest(buildNum, buildUrl) {
  kibanaPipeline.bash("""
    source src/dev/ci_setup/setup_env.sh

    # bootstrap from x-pack folder
    cd x-pack
    yarn kbn bootstrap --prefer-offline

    # Return to project root
    cd ..

    . src/dev/code_coverage/shell_scripts/extract_archives.sh

    . src/dev/code_coverage/shell_scripts/fix_html_reports_parallel.sh

    . src/dev/code_coverage/shell_scripts/merge_jest_and_functional.sh

    . src/dev/code_coverage/shell_scripts/copy_mocha_reports.sh

    . src/dev/code_coverage/shell_scripts/ingest_coverage.sh ${buildNum} ${buildUrl}

  """, "### Bootstrap shell and kibana env, merge and ingest code coverage")
}

def liveSitePrefix() {
  return "gs://elastic-bekitzur-kibana-coverage-live/"
}

def liveSiteVaultSecret() {
  return "secret/gce/elastic-bekitzur/service-account/kibana"
}

def previousPrefix() {
  return "${liveSitePrefix()}previous_pointer/"
}

def uploadCoverageStaticData(timestamp) {
  def prefix = liveSitePrefix()
  def timeStamp = "${prefix}${timestamp}/"

  uploadList(prefix, ['src/dev/code_coverage/www/index.html', 'src/dev/code_coverage/www/404.html'])
  uploadList(timeStamp, [
    'target/kibana-coverage/functional-combined',
    'target/kibana-coverage/jest-combined',
    'target/kibana-coverage/mocha-combined'
  ])
}

def uploadWithVault(vaultSecret, prefix, x) {
  withGcpServiceAccount.fromVaultSecret(vaultSecret, 'value') {
    sh """
        gsutil -m cp -r -a public-read -z js,css,html,txt ${x} '${prefix}'
      """
  }
}

def upload(prefix, x) {
  uploadWithVault(liveSiteVaultSecret(), prefix, x)
}

def uploadList(prefix, xs) {
  xs.each { x ->
    upload(prefix, x)
  }
}

def collectVcsInfo(title) {
  kibanaPipeline.bash(
    '''

    predicate() {
      x=$1
      if [ -n "$x" ]; then
        return
      else
        echo "### 1 or more variables that Code Coverage needs, are undefined"
        exit 1
      fi
    }

    CMD="git log --pretty=format"

    XS=("${GIT_BRANCH}" \
        "$(${CMD}":%h" -1)" \
        "$(${CMD}":%an" -1)" \
        "$(${CMD}":%s" -1)")

    touch VCS_INFO.txt


    for X in "${!XS[@]}"; do
    {
      predicate "${XS[X]}"
      echo "${XS[X]}" >> VCS_INFO.txt
    }
    done

    ''', title
  )
}

return this

