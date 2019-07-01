// Copyright 2019 Stanford University see Apache2.txt for license

require('dotenv').config()
const Octokit = require('@octokit/rest')
const SinopiaServer = require('sinopia_server')

const octokit = new Octokit ({
  auth: `token ${process.env.GITHUB_TOKEN}`
})

// import { ApiClient, LDPContainer, Resource } from 'sinopia_server'


const getProfiles = async (profile) => {
  const sample_profiles = await octokit.repos.getContents(
    { owner: 'LD4P',
      repo: 'sinopia_sample_profiles',
      path: '/profiles/v0.1.0/' }) // pass process.argvs
  sample_profiles.data.forEach(async row => {
    if (row.path.endsWith('.json')) {
      // console.log(`${row.name} - ${row.sha}`)
      let payload = await octokit.git.getBlob({
        owner: 'LD4P',
        repo: 'sinopia_sample_profiles',
        file_sha: row.sha
      })
      // Iterate through profile and extract Resource
      // console.log(Object.keys(payload.data))
      let raw_json = new Buffer(payload.data.content, 'base64').toString('ascii')
      console.log(raw_json)
      console.log(`Finished ${row.name} length ${raw_json.length}`)
      // let resource = new SinopiaServer.Resource(
      //   '@graph': raw_json
      // )
    }
  })
}

main()
