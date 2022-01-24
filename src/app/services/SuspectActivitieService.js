const SuspectActivitieModel = require("../models/SuspectActivitie");
const getUserId = require("../public/js/getUserId");

class SuspectActivitieService {
  async register(activitie) {
    const { userId, type, occurredRegion } = activitie;
    try {
      if (!userId) {
        throw new Error(`User ID ${userId} inválido`);
      }

      if (!type) {
        throw new Error(`Tipo ${type} inválido`);
      }

      if (!occurredRegion) {
        throw new Error(`Região ${occurredRegion} inválida`);
      }

      return await SuspectActivitieModel.create({
        userId,
        type,
        occurredRegion,
        occurredDate: new Date(),
      })
        .then(() => {
          console.info(
            `Created suspect activitie for the region ${occurredRegion}`
          );
        })
        .catch((error) => {
          throw new Error(error);
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

        return SuspectActivitieModel.find({ userId }, (err, docs) => {
          if (err) {
            throw new Error(err);
          }
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = SuspectActivitieService;
