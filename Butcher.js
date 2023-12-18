#!/usr/bin/env node

const TAG = "DNS Services"
import { DNSimple } from "dnsimple"
import { program, Option } from "commander"

const dnsConfig = {}

if (process.env.ORBIT_DNS_SIMPLE_ACCESS_TOKEN) {
  dnsConfig["Access Token"] = process.env.ORBIT_DNS_SIMPLE_ACCESS_TOKEN
}

program
  .name("Butcher")
  .description(`Manage DNSimple Records
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⢀⣀⣤⣤⠄⢀⣤⠀⣾⣿⣿⣿⠀⣀⠀⢠⣤⣤⣀⡀⠀⠀⠀⠀⠀
  ⠀⠀⠀⢀⣶⣿⣿⣿⠃⣰⣿⣿⣄⠙⠿⠿⠋⣠⣿⣷⡄⠹⣿⣿⣿⣶⡀⠀⠀⠀
  ⠀⠀⣰⣿⣿⣿⣿⠇⢰⣿⣿⣿⣿⣷⣶⣶⣾⣿⣿⣿⣿⡀⢹⣿⣿⣿⣿⣄⠀⠀
  ⠀⢸⣿⣿⡿⠋⠀⠀⣿⡏⠀⠙⠻⣿⣿⣿⣿⠟⠁⠀⣿⣧⠀⠀⠙⢿⣿⣿⡆⠀
  ⠀⣿⣿⡿⠀⠀⠀⢰⣿⣿⣤⣤⣴⣿⣿⣿⣿⣦⣤⣴⣿⣿⠀⠀⠀⠈⣿⣿⡇⠀
  ⠀⢹⣿⣇⠀⠀⠀⢸⣿⣿⣿⣿⣷⡙⠻⠟⢩⣿⣿⣿⣿⣿⠀⠀⠀⠀⣼⣿⡇⠀
  ⠀⠈⠻⣿⣆⠀⠀⠈⠉⠉⠉⣿⣿⣷⡀⢠⣿⣿⡏⠉⠉⠉⠀⠀⠀⣰⣿⠟⠀⠀
  ⠀⠀⠀⠈⠉⠓⠂⠀⠀⠀⠀⣿⣿⣿⣷⣿⣿⣿⡇⠀⠀⠀⠀⠐⠛⠉⠁⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢿⡟⠈⣿⡿⠈⢿⡇⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡆⠘⢀⡆⠸⠃⣠⠈⠃⢸⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⡇⠀⣾⣷⠀⢀⣿⣧⠀⣼⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⠇⠸⣿⣿⠀⠸⣿⣿⠆⢻⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀
`)

if (dnsConfig["Access Token"] == null) {
  program.requiredOption("--token <token>", "DNSimple Access Token <ORBIT_DNS_SIMPLE_ACCESS_TOKEN>")
}

export class Butcher {

  static name = "Butcher";

  identity = null;

  constructor (app) {
    this.app = app
    this.client = new DNSimple({"accessToken": dnsConfig["Access Token"]})
  }

  async fetchIdentity() {
    try {
      let response = await this.client.identity.whoami()
      if (response != null) {
        this.identity = response.data.account.id
        return this.identity
      }
      throw new Error("No identity found");
    } catch (error) {
      throw error
    }
  }

  async fetchZones(query) {
    try {
      let { data } = await this.client.zones.listZones(this.identity, query ? { name_like: query, per_page: 100 } : { per_page: 100 })
      return data
    } catch (error) {
      throw error
    }
  }

  async fetchZone (zoneId) {
    let { data } = await this.client.zones.listZoneRecords(this.identity, zoneId, { per_page: 100 })
    return data
  }

  async createZoneRecord(zoneId, zoneRecord) {
    let { data } = await this.client.zones.createZoneRecord(this.identity, zoneId, zoneRecord)
    return data
  }

  async deleteZoneRecord(zoneId, zoneRecordId) {
    let { data } = await this.client.zones.deleteZoneRecord(this.identity, zoneId, zoneRecordId)
    return data
  }

}

async function main() {
  let service = new Butcher()

  program
    .command("getZones")
    .description("Get a list of DNS Zones")
    .option("--query <string>", "Query")
    .action(async (options) => {
      try {
        if (service.identity == null) {
          await service.fetchIdentity()
        }
        let zones = await service.fetchZones()
        console.table(zones)
      } catch (error) {
        console.log(error)
      }
      process.exit(0)
    })

  // Get a zone's records
  program
    .command("getZone")
    .requiredOption("--id <string>", "Zone Id")
    .action(async (options) => {
      try {
        if (service.identity == null) {
          await service.fetchIdentity()
        }
        let zone = await service.fetchZone(options.id)
        console.table(zone)
      } catch (error) {
        console.error(error)
      }
    })

  // Create a zone record
  program
    .command("createRecord")
    .requiredOption("--id <string>", "Zone Id")
    .requiredOption("--name <string>", "Zone Name")
    .requiredOption("--content <string>", "Zone Content")
    .requiredOption("--ttl <number>", "Zone TTL", 3600)
    .requiredOption("--priority <number>", "Zone Priority", 10)
    .requiredOption("--type <string>", "Zone Type")
    .action(async (options) => {
      try {
        if (service.identity == null) {
          await service.fetchIdentity()
        }
        let zoneRecord = {
          "name": options.name,
          "content": options.content,
          "ttl": options.ttl,
          "priority": options.priority,
          "type": options.type
        }
        let zone = await service.createZoneRecord(options.id, zoneRecord)
        console.table(zone)
      } catch (error) {
        console.error(error)
      }
    })

  // Delete a zone record
  program
    .command("deleteRecord")
    .requiredOption("--id <string>", "Zone Id")
    .requiredOption("--recordId <string>", "Zone Record Id")
    .action(async (options) => {
      try {
        if (service.identity == null) {
          await service.fetchIdentity()
        }
        let zone = await service.deleteZoneRecord(options.id, options.recordId)
        console.table(zone)
      } catch (error) {
        console.error(error)
      }
    })

  program.parse(process.argv)
}

// If this script is run directly we will create an instance of DNSimpleService and show a list of all method names that can be run.
if (import.meta.url.endsWith(`${Butcher.name}.js`)) {
  Promise.all([main()])
}

// Selecting a method name will provide the user with the ability to enter arguments for that method and run it.

// If the method is run successfully then the result will be displayed.

