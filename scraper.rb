#!/usr/bin/env ruby
require "mechanize"
require "json"
require "byebug"

module FetchCreatures
  def self.agent
    @agent ||= Mechanize.new
  end

  def self.write(data, file)
    File.write(
      File.join(Dir.pwd, "_data", file), 
      JSON.pretty_generate(data))
  end

  def self.fetch_level_info(acc)
    html = Nokogiri::HTML agent.get(%(https://gswiki.play.net/Category:Creatures_by_Level)).content.toutf8
    html.css("td").map do |td|
      level = td.css("b").first.text.scan(/\d+/).first.to_i
      creatures = td.css("li").map(&:text).map(&:strip)
      creatures.each {|name|
        title = name
        slug = name.to_s.tr(" ","_")
        creature_url = 'https://gswiki.play.net/' + slug
        turtHtml = Nokogiri::HTML agent.get(%(#{creature_url})).content.toutf8
        area = turtHtml.search('th:contains("Area(s) Found") + td > a')
        areas = []
        area.each do |a|
          areas << a.text
        end
        classification = turtHtml.search('th:contains("Classification(s)") + td > a')
        classifications = []
        classification.each do |a|
          classifications << a.text
        end
        description = turtHtml.search('div#mw-content-text > p').first.text
        creature_info = acc[name.downcase] ||= {}
        creature_info.merge!({name: title},{level: level},{url: creature_url},{areas: areas},{classifications: classifications},{description: description.chomp})
      }
    end
  end

  def self.fetch_skin_info(acc)
    html = Nokogiri::HTML agent.get(%(https://gswiki.play.net/List_of_skins)).content.toutf8
    html.css("tr")[1..-1].each do |tr|
      (name, _level, skin) = tr.css("td").map(&:text).map(&:strip).map(&:downcase)
      acc.fetch(name)
      acc[name].merge!({skin: skin})
    end
  end

  def self.main()
    creatures = {}  
    fetch_level_info(creatures)
    pp creatures
    fetch_skin_info(creatures)
    # fetch_corp_undead_info(creatures)
    # fetch_noncorp_undead_info(creatures)
    # fetch_living_info(creatures)
    write(creatures, "creatures.json")
  end

  main()
end