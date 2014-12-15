var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var loadersByExtension = require("./config/loadersByExtension");
var joinEntry = require("./config/joinEntry");

module.exports = function(options) {
	var entry = {
		main: reactEntry("App")
	};
	var modulesDirectories = [
		"web_modules",
		"node_modules",
		"./app/modules"
	];
	var loaders = {
		"coffee": "coffee-redux-loader",
		"jsx": options.hotComponents ? ["react-hot-loader", "jsx-loader?harmony"] : "jsx-loader",
		"json": "json-loader",
		"json5": "json5-loader",
		"txt": "raw-loader",
		"png|jpg|jpeg|gif": "url-loader?limit=10000",
		"woff": "url-loader?limit=100000",
		"ttf|eot": "file-loader",
		"wav|mp3": "file-loader",
		"html": "html-loader",
		"md|markdown": ["html-loader", "markdown-loader"],
		"svg": "raw-loader"
	};
	var stylesheetLoaders = {
		"css": "css-loader!autoprefixer",
		"sass|scss": "style-loader!css-loader!autoprefixer!sass-loader"
	}
	var additionalLoaders = [];
	var alias = {

	};
	var aliasLoader = {

	};
	var externals = [

	];
	var extensions = ["", ".web.js", ".js", ".jsx"];
	var root = path.join(__dirname, "app");
	var output = {
		path: path.join(__dirname, "build", options.prerender ? "prerender" : "public"),
		publicPath: "/",
		filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
		chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
		sourceMapFilename: "debugging/[file].map",
		libraryTarget: options.prerender ? "commonjs2" : undefined,
		pathinfo: options.debug,
	};
	var plugins = [
		function() {
			if(!options.prerender) {
				this.plugin("done", function(stats) {
					require("fs").writeFileSync(path.join(__dirname, "config", "stats.json"), JSON.stringify(stats.toJson({
						chunkModules: true,
						exclude: [
							/node_modules[\\\/]react/
						]
					})));
				});
			}
		},
		new webpack.PrefetchPlugin("react"),
		new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
	];
	if(options.prerender) {
		aliasLoader["react-proxy$"] = "react-proxy/unavailable";
		externals.push(/^react(\/.*)?$/, /^reflux(\/.*)?$/);
		plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
	}
	if(options.commonsChunk) {
		plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
	}


	function reactEntry(name) {
		return (options.prerender ? "./config/prerender?" : "./app/App?") + name;
	}
	if(options.devServer) {
		if(options.hot) {
			entry = joinEntry("webpack/hot/dev-server", entry);
		}
		entry = joinEntry("webpack-dev-server/client?http://localhost:8080", entry);
	}
	Object.keys(stylesheetLoaders).forEach(function(ext) {
		var loaders = stylesheetLoaders[ext];
		if(Array.isArray(loaders)) loaders = loaders.join("!");
		if(options.prerender) {
			stylesheetLoaders[ext] = "null-loader";
		} else if(options.separateStylesheet) {
			stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", loaders);
		} else {
			stylesheetLoaders[ext] = "style-loader!" + loaders;
		}
	});
	if(options.separateStylesheet && !options.prerender) {
		plugins.push(new ExtractTextPlugin("[name].css"));
	}
	if(options.minimize) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			})
		);
	}

	return {
		entry: entry,
		output: output,
		target: options.prerender ? "node" : "web",
		module: {
			loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
		},
		devtool: options.devtool,
		debug: options.debug,
		resolveLoader: {
			root: path.join(__dirname, "node_modules"),
			alias: aliasLoader
		},
		externals: externals,
		resolve: {
			root: root,
			modulesDirectories: modulesDirectories,
			extensions: extensions,
			alias: alias,
		},
		plugins: plugins
	};
};
