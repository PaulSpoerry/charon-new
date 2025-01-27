import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, Role, RoleManager } from "discord.js";
import { Command } from "../abstractcommand";

const vcid = '643885054254252042'
const sosid = '643885092099588106'
const rsvdid = '732295056844914799'
const alliesid = '725829245884170270'
const fillid = '642038226734809090'

module.exports = class List extends Command {
    constructor() {
        super(async interaction => {
            interaction.deferReply()
            if(interaction.options.getBoolean('count')) {
                let countVc = (interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name == `vc list`).members.size;
                let countSOS = (interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name == `sos list`).members.size;
                let countRSVD = (interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name == `rsvd list`).members.size;
                let countAllies = (interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name == `allies list`).members.size;
                let countFill = (interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name == `fill list`).members.size;
                let countTotal = countVc + countSOS + countRSVD + countAllies + countFill;
                interaction.editReply(`**Votein counts:**\n\nVc: ${countVc}\nSOS: ${countSOS}\nRSVD: ${countRSVD}\nAllies: ${countAllies}\nFill: ${countFill}\n\nTotal: ${countTotal}`);
                return;
              }
              if(interaction.options.getString('list')) {
                await interaction.guild?.members.fetch()
                interaction.editReply({embeds: [{
                  color:4360181,
                  title:`Members in ${(interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name.toLowerCase() == interaction.options.getString('list')).name}`,
                  description: (interaction?.guild?.roles as any).cache.find((role: { name: string; }) => role.name.toLowerCase() == interaction.options.getString('list')).members.map((m: { user: { tag: any; }; })=>m.user.tag).join('\n')
                }]});
                return;
              }
              const listEmbed = new MessageEmbed()
            .setColor(`#4287F5`)
            .setAuthor(`Current Whitestar Lists`)
            .setFooter(`Charon - Society of Sin`, `https://cdn.discordapp.com/app-icons/787495162909032448/8ebf962e89f2d189c9634fcf7395e2af.png?size=256`)
            .setTimestamp(new Date());
            setTimeout(async () => {
                await interaction.guild?.members.fetch()
                const vcrole = await (interaction?.guild?.roles as RoleManager).fetch(vcid) as Role
                const sosrole = await (interaction?.guild?.roles as RoleManager).fetch(sosid) as Role
                const rsvdrole = await (interaction?.guild?.roles as RoleManager).fetch(rsvdid) as Role
                const alliesrole = await (interaction?.guild?.roles as RoleManager).fetch(alliesid) as Role
                const fillrole = await (interaction?.guild?.roles as RoleManager).fetch(fillid) as Role
            if(vcrole.members.size > 0) {
                let listString = "";
                vcrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`VC List`, `>>> ${listString}`)
            }
            if(sosrole.members.size > 0) {
                let listString = "";
                sosrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`SOS List`, `>>> ${listString}`)
            }
            if(rsvdrole.members.size > 0) {
                let listString = "";
                rsvdrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`RSVD List`, `>>> ${listString}`)
            }
            if(alliesrole.members.size > 0) {
                let listString = "";
                alliesrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`Allies List`, `>>> ${listString}`)
            }
            if(fillrole.members.size > 0) {
                let listString = "";
                fillrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`Fill List`, `>>> ${listString}`)
            }
            interaction.editReply({embeds: [listEmbed]});
            }, 500);
        })
        super.builder = new SlashCommandBuilder()
            .setName('list')
            .addStringOption(option =>
                option.setName('list')
                .setDescription('Individual list to view')
                .addChoices(
                    {name: 'VC', value: 'vc list'},
                    {name: 'SOS', value: 'sos list'},
                    {name: 'RSVD', value: 'rsvd list'},
                    {name: 'Allies', value: 'allies list'},
                    {name: 'Fill', value: 'fill list'},
                    {name: 'VC-WS', value: 'vc-ws'},
                    {name: 'SOS-WS', value: 'sos-ws'},
                )    
            )
            .addBooleanOption(option => 
                option.setName('count')
                .setDescription('Count current enlisted members')    
            )
            .setDescription('List current enlisted members')
    }
}