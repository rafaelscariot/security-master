const RegionModel = require("../models/Region");
const getUserId = require("../public/js/getUserId");

class RegionService {
  async register(region) {
    try {
      const { token, camStatus, name, description, ipCam, startTime, endTime } =
        region;
      if (
        !name ||
        !camStatus ||
        !description ||
        !ipCam ||
        !startTime ||
        !endTime
      ) {
        throw new Error("Campos inválidos");
      }

      const userIdPromise = getUserId(token);

      return await userIdPromise.then((user) => {
        const userId = user.data.userId;

        return RegionModel.find({ userId }).then((regions) => {
          regions.forEach((region) => {
            if (region.name === name) {
              throw new Error(`Região ${name} já cadastrada`);
            }

            if (region.ipCam === ipCam) {
              throw new Error(`Câmera IP ${ipCam} já cadastrada`);
            }
          });

          RegionModel.create({
            userId,
            name,
            description,
            ipCam,
            startTime,
            endTime,
            camStatus,
          })
            .then(() => {
              console.log(`Created region ${name}`);
            })
            .catch((error) => {
              throw new Error(error);
            });
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async searchById(token) {
    try {
      const userIdPromise = getUserId(token);

      return await userIdPromise.then((user) => {
        const userId = user.data.userId;

        return RegionModel.find({ userId }, (err, docs) => {
          if (err) {
            throw new Error(err);
          }
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(name) {
    try {
      if (!(await RegionModel.findOne({ name }))) {
        throw new Error(`Região ${name} não cadastrada`);
      }

      return RegionModel.deleteOne({ name }, (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async searchAll() {
    try {
      return RegionModel.find({}, (err, docs) => {
        if (err) {
          throw new Error(err);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(name, camStatus) {
    try {
      if (!(await RegionModel.findOne({ name }))) {
        throw new Error(`Região ${name} não cadastrada`);
      }

      let condition;

      if (camStatus === "Ativa") {
        condition = "Desativada";
      }

      if (camStatus === "Desativada") {
        condition = "Ativa";
      }

      const updateObject = { camStatus: condition };

      return RegionModel.updateOne(
        { name },
        updateObject,
        { new: true },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = RegionService;
