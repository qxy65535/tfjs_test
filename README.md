# tensorflow: test-project

使用webcam识别。目前只有我一个人的样本集。

```bash
cd tfjs
npm install
npm run server
```
~~我的前端非常之烂_(:3」∠)_~~

demo：https://qxy65535.github.io/

目前能检测握拳和手掌，好像现在只有这个样子的识别是最稳的。。我好难过

# 最近工作
last updated: 2018/10/23

1、制作样本数据集
```bash
python camera.py
```
数据将生成于当前目录下的data/class_name

2、retrain mobilenet

训练方法：

参考https://www.tensorflow.org/hub/tutorials/image_retraining

下载retrain脚本

```bash
curl -LO https://github.com/tensorflow/hub/raw/master/examples/image_retraining/retrain.py
```
retrain自定义数据集
```bash
python retrain.py --image_dir train \
  --tfhub_module https://tfhub.dev/google/imagenet/mobilenet_v1_025_224/feature_vector/1 \
  --how_many_training_steps=your_steps \
  --validation_batch_size=your_batch_size
```
训练后结果默认放置在/tmp中，可以自定义地设置更多选项。

3、制作tensorflow.js可用模型

将得到的tensorflow freeze模型转化为tensorflow.js可加载的模型
```bash
tensorflowjs_converter \
  --input_format=tf_frozen_model \
  --output_node_names='final_result' \
  --saved_model_tags=serve \
  /tmp/output_graph.pb \
  ~/mobilenet
```
retrain的原理是在mobilenet的最后延接一层并命名为
final_result(可在retrain.py时自定义)，然后用原mobilenet网络的输出作为其输入，仅训练最后一层（[迁移学习](https://blog.csdn.net/u010159842/article/details/79202107)）。本质上同吃豆人demo的做法，原理可参考吃豆人源码https://github.com/tensorflow/tfjs-examples/tree/master/webcam-transfer-learning。

我也有用keras复现吃豆人那种网络。。截取前部分mobilenet然后续接两层全连接。。然而分类准确率一直上不去。。结果也有(fei)点(chang)惨淡就先不放脏脏的源码了_(:3」∠)_
- 我觉得会不会是在我的数据集上过拟合了导致的？？
~~但转念一下它连我都认不出来好像不应该啊~~

4、使用tensorflow.js和webcam识别并输出

详见本项目tfjs下的源码

~~前端水平极差。。抄袭吃豆人~~

# 坑点
1、使用tensorflowjs_converter的时候，在windows下获得的文件无论如何不能被载入。。会报错。。比如
```error
uncaught (in promise) error: based on the provided shape, [3,3,8,1], and dtype float32, the tensor should have 72 values but has 3
```
其实也不是完全不能载入啦谜一样的就成功过一次。。有人说是生产环境导致的。。搞得我删了又建建了又删parcel和webpack换来换去。。

然而在ubuntu下执行它得到的文件完全没出过问题啊！！我好生气！！

2、好像暂时没有